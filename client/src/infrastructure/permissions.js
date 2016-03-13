export default {
    extend: (user) => {
        user.permissions = defaultPermissions();

        switch (user.role) {
            case 'student':
                user.permissions.isStudent = true;
                break;
            case 'teacher':
                user.permissions.isTeacher = true;
                user.permissions.abilities.canManageTrainingActivity = true;
                break;
            case 'manager':
                user.permissions.isManager = true;
                user.permissions.abilities.canManageSchedule = true;
                user.permissions.abilities.canManageUsers = true;
                break
        }
    }
}

function defaultPermissions() {
    return {
        isManager: false,
        isTeacher: false,
        isStudent: false,
        abilities: {
            canManageUsers: false,
            canManageSchedule: false,
            canManageTrainingActivity: false
        }
    }
}