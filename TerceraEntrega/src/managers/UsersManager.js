import { usersModel } from "../db/models/users.model.js";
import BasicManager from "./BasicManager.js";

class UsersManager extends BasicManager {

    constructor() {
        super(usersModel);
    }

    async findByEmail(email) {
        const user = await usersModel.findOne({ email });
        return user;
    }

}

export const usersManager = new UsersManager();