import AppConfig from "../Config"

export default class BaseManager {
    /**
     * Design to be an abstract class, defining fundamental attributes/methods for Manager-based classes
     */
    constructor() {
        if (Object.getPrototypeOf(this) === AbstractClass.prototype) {
            throw new Error("AbstractClass cannot be instantiated directly.");
            }
        this.config = new AppConfig();
        this.promise = this.config.initDB();
        this.collection = '';
    }

    async add() {
        throw new Error("Subclasses must implement abstractMethod.");
        // Insert data
    }

    async remove() {
        throw new Error("Subclasses must implement abstractMethod.");
        // Drop data
    }
    
    async listAll() {
        throw new Error("Subclasses must implement abstractMethod.");
        // Return all existing data 
    }
}