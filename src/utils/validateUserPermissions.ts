type User = {
  roles: string[]
}

type ValidateUserPermissionsParams = {
  userRoles: User
  roles: string[]
}

export default function validateUserPermissions({
  userRoles,
  roles
}: ValidateUserPermissionsParams) {
  if (userRoles.roles.length === 0) {
    return false
  }

  if (roles.length > 0) {
    const hasAllRoles = roles.some(role => {
      return userRoles.roles.includes(role)
    })

    if (!hasAllRoles) {
      return false
    }
  }

  return true
}
