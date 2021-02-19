

const CreatePersonalService = () => {
    let instance: any;

    function init() {
        return {

        }
    };
    
    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        }
    }
}

export default CreatePersonalService;
