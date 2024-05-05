export const createUserSchema = {
    username: {
        isLength: {
            options: {
                min: 1,
                max: 10,
            },
            errorMessage:
                "Username must be in range of 1 to 10 in Length",
        },
        isString: {
            errorMessage: "Username must be in String",
        },
        notEmpty: {
            errorMessage: "Username Can't be Empty",
        },
    },
    displayname: {
        notEmpty: {
            errorMessage: "Displayname Can't be Empty",
        },
    },
}