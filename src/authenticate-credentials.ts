import { USERS } from './userLogins';

const authenticateCredentials = (base64EncdodedValue: string) => {

    const decodedValue = Buffer.from(base64EncdodedValue, 'base64').toString('ascii');

    const [username, userPassword] = decodedValue.split(':');

    if (!username || !userPassword) {
        return false;
    }


    const { users: usersConfig } = USERS;

    for (const userConfig of usersConfig) {

        const { userLogin: userNameConfig, password: passwordConfig } = userConfig;

        if (username == userNameConfig && userPassword == passwordConfig) return true;

    }
    return false;
}

export {
    authenticateCredentials
}