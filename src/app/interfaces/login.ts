export interface Login{
    username: string
    password: string
}

export interface ResLogin {
    status: string,
    mensaje: string,
    token?: string //tiene signo de pregunta porque no sabemos si vamos a recibirlo o no (si sale mal no da token)
}