import User from "../models/User.js";
import Lead from "../models/Leads.js";
import Task from "../models/Tasks.js";
// import Sale from '../models/Sales.js';
// import Revenue from '../models/Revenue.js';

const formatRevenue = (amount) => {
  if (amount >= 100000) return `₨ ${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₨ ${(amount / 1000).toFixed(1)}K`;
  return `₨ ${amount}`;
};

const sumRevenue = async (filter = {}) => {
  const result = await Revenue.aggregate([
    ...(Object.keys(filter).length ? [{ $match: filter }] : []),
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  return result[0]?.total || 0;
};

export const getDashboard = async (req, res, next) => {
  try {
    const now = new Date();

    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      totalCustomers,
      activeLeads,
      pendingTasks,
      revenueResult,
      currentmonthCustomers,
      lastmonthCustomers,
    ] = await Promise.all([
      // Total Customers
      User.countDocuments({ role: "customer" }),

      // All Leads
      Lead.countDocuments(),

      // Pending Tasks (Todo)
      Task.countDocuments({ status: "to do" }),

      // Revenue (Exclude Lost Leads)
      Lead.aggregate([
        {
          $match: {
            status: { $ne: "lost" },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$value",
            },
          },
        },
      ]),
    ]);

    const currentMonthCustomers = await User.countDocuments({
      role: "customer",
      createdAt: {
        $gte: currentMonthStart,
      },
    });

    const lastMonthCustomers = await User.countDocuments({
      role: "customer",
      createdAt: {
        $gte: lastMonthStart,
        $lt: currentMonthStart,
      },
    });

    let customerTrend = 0;

    if (lastMonthCustomers > 0) {
      customerTrend = Math.round(
        ((currentMonthCustomers - lastMonthCustomers) / lastMonthCustomers) *
          100,
      );
    }

    const currentMonthLeads = await Lead.countDocuments({
      createdAt: {
        $gte: currentMonthStart,
      },
    });

    const lastMonthLeads = await Lead.countDocuments({
      createdAt: {
        $gte: lastMonthStart,
        $lt: currentMonthStart,
      },
    });

    let leadTrend = 0;

    if (lastMonthLeads > 0) {
      leadTrend = Math.round(
        ((currentMonthLeads - lastMonthLeads) / lastMonthLeads) * 100,
      );
    }

    const currentMonthTasks = await Task.countDocuments({
      status: "to do",
      createdAt: {
        $gte: currentMonthStart,
      },
    });

    const lastMonthTasks = await Task.countDocuments({
      status: "to do",
      createdAt: {
        $gte: lastMonthStart,
        $lt: currentMonthStart,
      },
    });

    let taskTrend = 0;

    if (lastMonthTasks > 0) {
      taskTrend = Math.round(
        ((currentMonthTasks - lastMonthTasks) / lastMonthTasks) * 100,
      );
    }

    const currentMonthRevenue = await Lead.aggregate([
      {
        $match: {
          status: { $ne: "lost" },
          createdAt: { $gte: currentMonthStart },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$value" },
        },
      },
    ]);

    const lastMonthRevenue = await Lead.aggregate([
      {
        $match: {
          status: { $ne: "lost" },
          createdAt: {
            $gte: lastMonthStart,
            $lt: currentMonthStart,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$value" },
        },
      },
    ]);

    //Lead trend
    const leadStats = await Lead.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const leadChart = Array(12).fill(0);

    leadStats.forEach((item) => {
      leadChart[item._id - 1] = item.total;
    });

    //Revenue trend
    const revenueStats = await Lead.aggregate([
      {
        $match: {
          status: { $ne: "lost" },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: {
            $sum: "$value",
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    //task trend
    const taskOverview = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskChart = {
      todo: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
    };

    taskOverview.forEach((task) => {
      switch (task._id) {
        case "to do":
          taskChart.todo = task.count;
          break;

        case "in progress":
          taskChart.inProgress = task.count;
          break;

        case "completed":
          taskChart.completed = task.count;
          break;

        case "cancelled":
          taskChart.cancelled = task.count;
          break;
      }
    });

    //Recent Activity
    const recentLeads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name createdAt");

    const recentTasks = await Task.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title status createdAt");

    const recentCustomers = await User.find({
      role: "customer",
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name createdAt");

    const recentActivity = [
      ...recentLeads.map((item) => ({
        type: "lead",
        text: `New lead added: ${item.name}`,
        date: item.createdAt,
      })),

      ...recentTasks.map((item) => ({
        type: "task",
        text: `Task created: ${item.title}`,
        date: item.createdAt,
      })),

      ...recentCustomers.map((item) => ({
        type: "customer",
        text: `New customer: ${item.name}`,
        date: item.createdAt,
      })),
    ]
      .sort((a, b) => b.date - a.date)
      .slice(0, 8);

    const revenueChart = Array(12).fill(0);

    revenueStats.forEach((item) => {
      revenueChart[item._id - 1] = item.total;
    });

    const currentRevenue =
      currentMonthRevenue.length > 0 ? currentMonthRevenue[0].total : 0;

    const previousRevenue =
      lastMonthRevenue.length > 0 ? lastMonthRevenue[0].total : 0;

    let revenueTrend = 0;

    if (previousRevenue > 0) {
      revenueTrend = Math.round(
        ((currentRevenue - previousRevenue) / previousRevenue) * 100,
      );
    }

    const revenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      data: {
        customers: {
          value: totalCustomers,
          change: `${Math.abs(customerTrend)}%`,
          trend: customerTrend >= 0 ? "up" : "down",
        },
        leads: {
          value: activeLeads,
          change: `${Math.abs(leadTrend)}%`,
          trend: leadTrend >= 0 ? "up" : "down",
        },
        tasks: {
          value: pendingTasks,
          change: `${Math.abs(taskTrend)}%`,
          trend: taskTrend >= 0 ? "up" : "down",
        },
        revenue: {
          value: formatRevenue(revenue),
          change: `${Math.abs(revenueTrend)}%`,
          trend: revenueTrend >= 0 ? "up" : "down",
        },
        customerTrend,
        leadTrend,
        taskTrend,
        revenueTrend,
        leadChart,
        revenueChart,
        taskChart,
        recentActivity,
      },
    });
  } catch (error) {
    next(error);
  }
};

//analytics using AI
export const getAnalytics = async (req, res, next) => {
  try {
    // total revenue
    const revenue = await Lead.aggregate([
      {
        $match: {
          status: { $ne: "lost" },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$value" },
        },
      },
    ]);

    const totalRevenue = revenue.length ? revenue[0].totalRevenue : 0;

    //total customer
    const totalCustomers = await User.countDocuments({ role: "customer" });

    //conversion rate
    const convertedLeads = await Lead.countDocuments({
      status: "converted",
    });

    const totalLeads = await Lead.countDocuments();

    const conversionRate =
      totalLeads === 0
        ? 0
        : Number(((convertedLeads / totalLeads) * 100).toFixed(2));

    //total task
    const totalTasks = await Task.countDocuments();

    //lead by source
    // Leads by Source
    const leadsOverview = await Lead.aggregate([
      {
        $group: {
          _id: "$source",
          count: { $sum: 1 },
        },
      },
    ]);

    const leadsChart = {
      website: 0,
      referral: 0,
      linkedIn: 0,
      coldCall: 0,
      email: 0,
      other: 0,
    };

    leadsOverview.forEach((lead) => {
      switch (lead._id) {
        case "Website":
          leadsChart.website = lead.count;
          break;

        case "Referral":
          leadsChart.referral = lead.count;
          break;

        case "LinkedIn":
          leadsChart.linkedIn = lead.count;
          break;

        case "Cold Call":
          leadsChart.coldCall = lead.count;
          break;

        case "Email":
          leadsChart.email = lead.count;
          break;

        case "Other":
          leadsChart.other = lead.count;
          break;
      }
    });

    //task by status
    // Task Trend
    const taskOverview = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskChart = {
      todo: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
    };

    taskOverview.forEach((task) => {
      switch (task._id) {
        case "to do":
          taskChart.todo = task.count;
          break;

        case "in_progress":
          taskChart.inProgress = task.count;
          break;

        case "completed":
          taskChart.completed = task.count;
          break;

        case "cancelled":
          taskChart.cancelled = task.count;
          break;
      }
    });

    // Customer Growth
    const customerGrowth = await User.aggregate([
      {
        $match: {
          role: "customer",
          createdAt: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          customers: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const customerChart = {
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    };

    customerGrowth.forEach((item) => {
      switch (item._id) {
        case 1:
          customerChart.jan = item.customers;
          break;
        case 2:
          customerChart.feb = item.customers;
          break;
        case 3:
          customerChart.mar = item.customers;
          break;
        case 4:
          customerChart.apr = item.customers;
          break;
        case 5:
          customerChart.may = item.customers;
          break;
        case 6:
          customerChart.jun = item.customers;
          break;
        case 7:
          customerChart.jul = item.customers;
          break;
        case 8:
          customerChart.aug = item.customers;
          break;
        case 9:
          customerChart.sep = item.customers;
          break;
        case 10:
          customerChart.oct = item.customers;
          break;
        case 11:
          customerChart.nov = item.customers;
          break;
        case 12:
          customerChart.dec = item.customers;
          break;
      }
    });

    const revenueByCustomer = await Lead.aggregate([
      {
        $match: {
          status: { $ne: "lost" },
        },
      },
      {
        $group: {
          _id: "$customer",
          revenue: { $sum: "$value" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $project: {
          _id: 0,
          name: "$customer.name",
          revenue: 1,
        },
      },
      {
        $sort: {
          revenue: -1, // Highest revenue first
        },
      },
      {
        $limit: 10, // Top 10 customers
      },
    ]);

    const customerRevenueChart = {
      labels: revenueByCustomer.map((item) => item.name),
      revenue: revenueByCustomer.map((item) => item.revenue),
    };

    res.status(200).json({
      success: true,
      data: {
        revenue: formatRevenue(totalRevenue),
        totalCustomers,
        conversionRate,
        totalTasks,
        leadsChart,
        taskChart,
        customerChart,
        customerRevenueChart,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    user.password = undefined;
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await User.find({ role: "customer" });
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    next(error);
  }
};

export const createLead = async (req, res, next) => {
  try {
    const leads = await Lead.create(req.body);

    const populatedLead = await Lead.findById(leads._id).populate("assignedTo", "name role")
    res.status(200).json({ success: true, data: populatedLead });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find().populate("assignedTo", "name role").populate("customer", "name email");
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    if (!req.body.customer) {
      req.body.customer = null;
    }
    if (!req.body.assignedTo) {
      req.body.assignedTo = null; // Unassign the lead if assignedTo is not provided
    }
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("assignedTo", "name role").populate("customer", "name email");
    if (!updatedLead)
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    res.status(200).json({ success: true, data: updatedLead });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    const delLead = await Lead.findByIdAndDelete(req.params.id);
    if (!delLead)
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);

    const populatedTask = await Task.findById(task._id)
  .populate("assignedTo", "name role")
  .populate("customer", "name email")
  .populate("project", "name status deadline");
    res.status(200).json({ success: true, data: populatedTask });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find()
  .populate("customer", "name")
  .populate("assignedTo", "name role")
  .populate("createdBy", "name")
  .populate("project", "name status deadline");
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
     const updatedTask = await Task.findByIdAndUpdate(
  req.params.id,
  req.body,
  {
    new: true,
    runValidators: true,
  }
)
  .populate("assignedTo", "name role")
  .populate("customer", "name email")
  .populate("project", "name status deadline");
    if (!updatedTask)
      return res
        .status(404)
        .json({ success: false, message: "Task not update or found!" });
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const delTask = await Task.findByIdAndDelete(req.params.id);
    if (!delTask)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
