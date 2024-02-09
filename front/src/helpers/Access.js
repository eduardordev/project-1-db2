import localAcesses from './localAccesses.json';

export function GetlocalAccesses (role,view){
    const roles = localAcesses.roles;
    if(roles[role] !== undefined){
        if(roles[role].views[view] !== undefined){
            return roles[role].views[view];
        } else {
            return false;
        }
    } else {
        return false;
    }
}