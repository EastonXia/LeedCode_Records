function getController() {
    return class pController {
        constructor() {
            this.name = 'pController';
        }

        getName = () => {
            console.log('this.name', this.name)
            return this.name;
        }
    }
}

let controller = getController()

const obj = {
    controller: {
        pController: new controller()
    }
}

function foo (fn) {
    fn();
}

const getRouter = (app) => {
    const { pController: projectController } = app.controller;

    foo(projectController.getName);
}

getRouter(obj);