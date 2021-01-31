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

function resolve(message) {
    console.log(message);
    return message;
}

function reject(message) {
    console.log(message);
    return message;
}

const resolvedMessage = 'Promise did resolved';

function handleResolve(txt) {
    const message = txt ?
        `${resolvedMessage} with: ${txt}` :
        resolvedMessage;

    return handlePromise(resolve.bind(null, message));
}

const rejectMessage = 'Promise did reject';

function handleReject(txt) {
    const message = txt ?
        `${rejectMessage} with: ${txt}` :
        rejectMessage;
    return handlePromise(null, reject.bind(null, message));
}

const handleWithMessage = (callback) => {
    const message = document.getElementById('message').value;
    return callback(message);
}

function onResolutionClicked(withMessage = false) {
    const resolution = document.querySelector('input[name="resolution"]:checked') && document.querySelector('input[name="resolution"]:checked').value;
    const resolutionField = document.getElementById('resolutionField');
    if (!resolution) {
        return resolutionField.classList.add('error');
    }

    resolutionField.classList.remove('error');

    const isResolved = resolution === 'resolve';
    const handler = isResolved ? handleResolve : handleReject;
    const deferred = withMessage ? handleWithMessage.bind(null, handler) : handler
    const ele = document.getElementById(`console${withMessage ? 2 : 1}`);

    deferred()
        .then(response => {
            ele.innerText = response
        })
        .catch(error => {
            ele.innerText = error
        })
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

const getSalario = (employee) => {
    if (!Object.prototype.hasOwnProperty.call(employee, 'id')) {
        throw new TypeError('getSalario, needs a valid employee entity')
    }
    const salary = salaries.find(salary => salary.id === employee.id)
    return salary && Object.prototype.hasOwnProperty.call(salary, 'salary') ?
        Promise.resolve(salary.salary) :
        Promise.reject(new Error(`Could not find a salary for employee with id: ${employee.id}`))
}

function onSearchEmployeeClicked(searchProp) {
    const employeeId = Number(inputEmployee.value)

    if (searchProp === 'employee') {
        getEmpleado(employeeId)
            .then(employee => {
                consoleEmployee.innerHTML = `The search employee's name is ${employee.name}`;
            })
            .catch(error => consoleEmployee.innerHTML = error)
    } else {
        getEmpleado(employeeId)
            .then(employee => {
                return getSalario(employee)
                    .then(salary => {
                        consoleEmployee.innerHTML = `The salary of ${employee.name} is : ${salary}`;
                    })
            })
            .catch(error => {
                console.error(error)
                consoleEmployee.innerText = error
            })
    }

}

document.addEventListener("DOMContentLoaded", function(event) {
    inputEmployee = document.getElementById('employeeId');
    consoleEmployee = document.getElementById('console3');
});