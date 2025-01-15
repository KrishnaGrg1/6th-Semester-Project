import bcrypt from 'bcrypt'

bcrypt.compare("Pokhara-16", "$2b$10$/pCm9s5JtzcDGMS4HVB0QOgzp6HIv13YimIAQeT96mxSGcp06dr0e").then(function (e) {
    if (e) {
        console.log("matched")
    } else {
        console.log("not matched")
    }
})