class BaseAccount{
    constructor(id, name, password, email, phone_number) {
        this.id = this.id;
        this.name = name; 
        this.password = password;
        this.email = email;
        this.phone_number = phone_number;
    }

    displayInfo() {
        return {
            'username' : this.name, 
            'email': this.email,
            'phone_number': this.phone_number
        };
    }
}

export default BaseAccount;
