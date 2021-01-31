function handlePromise(resolve, reject) {
    return new Promise((a, b) => {
        setTimeout(() => {
            if (resolve) {
                return a(resolve());
            }
            if (reject) {
                return b(reject());
            }
        }, 200)
    });
}

function resolve(message = 'Promise did resolved') {
    console.log(message);
    return message;
}

function reject(message = "Promise did reject") {
    console.log(message);
    return message;
}

function handleResolve(message) {
    return handlePromise(resolve.bind(null, message));
}

function handleReject(message) {
    return handlePromise(null, reject.bind(null, message));
}

const handleWithMessage = (callback) => {
    const message = document.getElementById('message').value;
    return callback(message);
}

async function onResolutionClicked(withMessage = false) {
    const resolution = document.querySelector('input[name="resolution"]:checked') && document.querySelector('input[name="resolution"]:checked').value;
    const resolutionField = document.getElementById('resolutionField');
    if (!resolution) {
        return resolutionField.classList.add('error');
    }

    resolutionField.classList.remove('error');

    const isResolved = resolution === 'resolve';
    const handler = isResolved ? handleResolve : handleReject;
    let result = '';
    try {
        result = withMessage ?
            await handleWithMessage(handler) :
            await handler();

    } catch (error) {
        result = error;
    }

    const ele = document.getElementById(`console${withMessage ? 2 : 1}`);
    ele.innerText = result;
}

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

const getSalario = async(employee) => {
    if (!Object.prototype.hasOwnProperty.call(employee, 'id')) {
        throw new TypeError('getSalario, needs a valid employee entity')
    }
    const salary = salaries.find(salary => salary.id === employee.id)
    return salary && Object.prototype.hasOwnProperty.call(salary, 'salary') ?
        Promise.resolve(salary.salary) :
        Promise.reject(new Error(`Could not find a salary for employee with id: ${employee.id}`))
}

async function onSearchEmployeeClicked(searchProp) {
    const employeeId = Number(inputEmployee.value)

    if (searchProp === 'employee') {
        getEmpleado(employeeId)
            .then(employee => {
                consoleEmployee.innerHTML = `The search employee's name is ${employee.name}`;
            })
            .catch(error => consoleEmployee.innerHTML = error)
    } else {
        try {
            const employee = await getEmpleado(employeeId)
            const salary = await getSalario(employee)
            consoleEmployee.innerHTML = `The salary of ${employee.name} is : ${salary}`;
        } catch (error) {
            console.error(error)
            consoleEmployee.innerText = error
        }
    }

}

document.addEventListener("DOMContentLoaded", function(event) {
    inputEmployee = document.getElementById('employeeId');
    consoleEmployee = document.getElementById('console3');
});