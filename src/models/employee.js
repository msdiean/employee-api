/**
 * Employee model
 */
class Employee {
  constructor({
    employeeId,
    firstName,
    lastName,
    email,
    department,
    designation,
    salary,
    createdAt,
    updatedAt,
  }) {
    this.employeeId = employeeId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.department = department;
    this.designation = designation;
    this.salary = salary;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toItem() {
    return {
      employeeId: this.employeeId,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      department: this.department,
      designation: this.designation,
      salary: this.salary,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = Employee;
