interface Device{
    [key: string]: {
        PIN: number,
    }
}

interface Locations{
    [key: string]:{
        Devices: Device;
    }
}

export const LocationList: Locations = {
    ['centro de cómputo 1']: {
        Devices: {
            ['luces']: {PIN: 1},
            ['puertas']: {PIN: 2},
            ['aires acondicionados']: {PIN: 3},
        }
    },

    ['centro de cómputo 2']: {
        Devices: {
            ['luces']: {PIN: 4},
            ['puertas']: {PIN: 5},
            ['aires acondicionados']: {PIN: 6},
        }
    },
    

    ['aula 8']: {
        Devices: {
            ['luces']: {PIN: 7},
            ['puertas']: {PIN: 8},
            ['aires acondicionados']: {PIN: 9},
        }   
    },

    ['aula 9']: {
        Devices: {
            ['luces']: {PIN: 10},
            ['puertas']: {PIN: 11},
            ['aires acondicionados']: {PIN: 12},
        }   
    },

    ['aula 10']: {
        Devices: {
            ['luces']: {PIN: 13},
            ['puertas']: {PIN: 14},
            ['aires acondicionados']: {PIN: 15},
        }   
    },
}
