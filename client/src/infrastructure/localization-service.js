import counterpart from 'counterpart';

export default class LocalizationService {
    constructor(constants) {
        this.constants = constants;
    }
    
    translate(constantName) {
        return this.constants[counterpart.getLocale()][constantName];
    }
}