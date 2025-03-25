// Class to hold task information
class Task {
    // CONSTRUCTOR USED HERE
    constructor(name, status, dueDate) {
        this.name = name;
        this.status = status;
        this.dueDate = dueDate;
        this.isOverdue = false;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }

    getDueDate() {
        return this.dueDate;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    // Checks if task is overdue. Sets isOverdue to true if overdue, false otherwise.
    checkDueDate() {
        let today = new Date();
        let adjustedDueDate = new Date(this.dueDate);
        adjustedDueDate.setDate(adjustedDueDate.getDate() + 1); // Add one day
        this.isOverdue = today > adjustedDueDate;
    }
}