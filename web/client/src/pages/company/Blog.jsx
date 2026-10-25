// src/pages/Company/Blog.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Clock,
  ArrowUpRight,
  Mail,
  Send,
  CheckCircle2,
} from "lucide-react";
import N from "../../components/parts/Navbar.jsx";
import F from "../../components/parts/Footer.jsx";
import PageHero from "../../components/common/PageHero.jsx";
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
  viewportOnce,
} from "../../components/common/motionVariants";

import { posts } from "../../mock/mockArticles.js";

const categories = ["All", "Sales", "Product", "Engineering", "Growth"];

const Blog = () => {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = active === "All" || p.category === active;
      const matchQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [active, query]);

  const featured = posts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || active !== "All" || query);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <>
      <N />

      <PageHero
        badge="Blog"
        title="Insights on sales, product and"
        highlight="growth"
        description="Practical writing from the team building the product — no fluff, no gated PDFs."
      >
        <div className="relative max-w-xl mx-auto mt-6">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-orange-500 rounded-lg pl-11 pr-4 py-3.5 text-white placeholder:text-gray-500 outline-none transition-colors"
          />
        </div>
      </PageHero>

      {/* FEATURED */}
      {featured && active === "All" && !query && (
        <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl border border-[#2a2a2a] bg-[#181818]/90 overflow-hidden group cursor-pointer hover:border-orange-500 transition-colors"
          >
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img
                src={featured.img}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <Link to={`/blog/article/${featured.id}`}>
              <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-500 bg-orange-500/10 border border-orange-500/30 px-2.5 py-1 rounded-full">
                    Featured
                  </span>
                  <span className="text-gray-500 text-xs">{featured.date}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug group-hover:text-orange-500 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-400 leading-7">{featured.excerpt}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={featured.avatar}
                      alt={featured.author}
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <div className="text-white text-sm font-bold">
                        {featured.author}
                      </div>
                      <div className="text-gray-500 text-xs flex items-center gap-1.5">
                        <Clock size={12} /> {featured.read}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-orange-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* GRID */}
      <section className="w-full bg-[#0f0f0f] px-6 sm:px-10 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {/* CATEGORIES */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                variants={fadeInUp}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
                  active === cat
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-[#181818] border-[#2a2a2a] text-gray-400 hover:border-orange-500 hover:text-orange-500"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* POSTS */}
          {rest.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {rest.map((post, i) => (
                <motion.article
                  key={i}
                  variants={staggerItem}
                  whileHover={{ y: -8, borderColor: "#f97316" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col rounded-xl bg-[#181818]/90 border border-[#2a2a2a] overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider text-orange-500 bg-[#0f0f0f]/90 border border-orange-500/30 px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 p-6 flex-1">
                    <div className="flex items-center gap-3 text-gray-500 text-xs">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {post.read}
                      </span>
                    </div>
                    <Link
                      to={`/blog/article/${post.id}`}
                      className="text-lg font-bold text-white leading-snug group-hover:text-orange-500 transition-colors"
                    >
                      {post.title}
                    </Link>
                    <p className="text-gray-400 text-sm leading-6 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 pt-3 border-t border-[#2a2a2a]">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-7 h-7 rounded-full"
                      />
                      <span className="text-gray-400 text-xs font-medium">
                        {post.author}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-gray-500 py-16">
              No articles match your search.
            </p>
          )}

          {/* NEWSLETTER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-2xl border border-orange-500/30 bg-linear-to-r from-orange-500/15 to-transparent p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-orange-500 mb-2">
                <Mail size={18} />
                <span className="text-sm font-bold tracking-widest uppercase">
                  Newsletter
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-wide">
                One useful email, twice a month
              </h3>
              <p className="text-gray-400 mt-2">
                No spam, no fluff. Unsubscribe in one click.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 size={20} /> You're subscribed!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex w-full lg:w-auto gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 lg:w-72 bg-[#0f0f0f] border border-[#2a2a2a] focus:border-orange-500 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <Send size={16} />
                  <span className="hidden sm:inline">Subscribe</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <F />
    </>
  );
};

export default Blog;
