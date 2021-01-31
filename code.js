let employees = [{
    id: 1,
    name: 'Linux Torvalds'
}, {
    id: 2,
    name: 'Bill Gates'
}, {
    id: 3,
    name: 'Jeff Bezos'
}];

let salaries = [{
    id: 1,
    salary: 4000
}, {
    id: 2,
    salary: 1000
}, {
    id: 3,
    salary: 2000
}];

const getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        const res = employees.find(emp => emp.id === id)
        return res ?
            resolve(res) :
            reject(new Error(`There's no employee with id: ${id}`))
    })
}

const getSalario = (employee) => {
    if (!Object.prototype.hasOwnProperty.call(employee, 'id')) {
        throw new TypeError('getSalario, needs a valid employee entity')
    }
    const salary = salaries.find(salary => salary.id === employee.id)
    return salary && Object.prototype.hasOwnProperty.call(salary, 'salary') ?
        Promise.resolve(salary.salary) :
        Promise.reject(new Error(`Could not find a salary for employee with id: ${employee.id}`))
}

async function searchEmployeeBy(searchProp) {
    const employeeId = Number(inputEmployee.value)
    return new Promise((resolve, reject) => {
        setTimeout(async() => {
            if (searchProp === 'employee') {
                try {
                    const employee = await getEmpleado(employeeId);
                    resolve(employee);
                } catch (error) {
                    reject(error);
                }
            } else {
                try {
                    const employee = await getEmpleado(employeeId)
                    const salary = await getSalario(employee)
                    resolve([employee, salary])
                } catch (error) {
                    reject(error)
                }
            }
        }, 2000)
    })

}

async function onSearchEmployeeClicked(searchProp) {
    section.classList.add('is-loading');
    consoleEmployee.innerHTML = '';
    try {
        const response = await searchEmployeeBy(searchProp);

        Array.isArray(response) ?
            consoleEmployee.innerHTML = `The salary of ${response[0].name} is : ${response[1]}` :
            consoleEmployee.innerHTML = `The search employee's name is ${response.name}`;
    } catch (error) {
        console.error(error);
        consoleEmployee.innerText = error;
    }

    section.classList.remove('is-loading')
}

document.addEventListener("DOMContentLoaded", function(event) {
    inputEmployee = document.getElementById('employeeId');
    consoleEmployee = document.getElementById('console3');
    section = document.getElementById('section')
});