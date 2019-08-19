export class Usuario {
    constructor (
        public nombre: String,
        public email: String, 
        public password: String,
        public img?: String,
        public rol?: String,
        public google?: Boolean,
        public _id?: String,
    ) {}
}