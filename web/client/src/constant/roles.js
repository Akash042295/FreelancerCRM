
export const ROLES = {
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
    CUSTOMER: 'customer',
}

export const ROLE_ROUTES = {
    [ROLES.ADMIN]: '/admin',
    [ROLES.EMPLOYEE]: '/employee',
    [ROLES.CUSTOMER]: '/customer',
}

export const ROLE_DASHBOARD = {
    [ROLES.ADMIN]: '/admin/dashboard',
    [ROLES.EMPLOYEE]: '/employee/dashboard',
    [ROLES.CUSTOMER]: '/customer/dashboard',
}