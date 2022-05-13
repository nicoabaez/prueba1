new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12]
    },

    methods: {
    getSalud(salud) {
        return `${salud}%`
    },
    empezarPartida: function () {
        this.hayUnaPartidaEnJuego = true;
        this.saludJugador = 100;
        this.saludMonstruo = 100;
        this.turnos = [];
    },
    atacar: function () {
        let daño = this.calcularHeridas(this.rangoAtaque)
        this.saludMonstruo -= daño

        this.turnos.unshift({
            esJugador: true,
            text: 'Jugador ataca causando ' + daño + ' puntos de daño.'
        });

        if(this.verificarGanador()){
            return;
        } else {
            this.ataqueDelMonstruo();
        }
    },

    ataqueEspecial: function () {
        let daño = this.calcularHeridas(this.rangoAtaqueEspecial)
        this.saludMonstruo -= daño

        this.turnos.unshift({
            esJugador: true,
            text: 'Jugador realiza ataque especial, causando ' + daño + ' puntos de daño.'
        });
        
        if(this.verificarGanador()){
            return;
        } else {
            this.ataqueDelMonstruo();
        }
    },

    curar: function () {
        let curacion = 10;
        if(this.saludJugador <= 90){
            this.saludJugador += curacion;
        } else {
            this.saludJugador = 100;
        }

        this.turnos.unshift({
            esJugador: true,
            text: 'Jugador se cura ' + curacion + ' puntos de salud.'
        });
        
        this.ataqueDelMonstruo();
    },

    terminarPartida: function () {
        this.hayUnaPartidaEnJuego = false;
        if (confirm('Te has rendido... ¿Querés jugar de nuevo?')) {
            this.empezarPartida();
        }
    },

    ataqueDelMonstruo: function () {
        let daño = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
        this.saludJugador -=  daño
        this.turnos.unshift({
            esJugador: false,
            text: 'Monstruo ataca causando ' + daño + ' puntos de daño.'
        });
        
        this.verificarGanador();
    },

    calcularHeridas: function (rango) {
        return this.obtenerEnteroRandomEntre(rango[0], rango[1])
    },
    verificarGanador: function () {
        if(this.saludMonstruo <= 0) {
            if (confirm('¡Ganaste! ¿Querés jugar de nuevo?')) {
                this.empezarPartida();
            } else {
                this.hayUnaPartidaEnJuego = false;
            }
            return true;
        } else if (this.saludJugador <= 0) {
            if (confirm('¡Perdiste! ¿Querés jugar de nuevo?')) {
                this.empezarPartida();
            } else {
                this.hayUnaPartidaEnJuego = false;
            }
            return true;
        }
        return false;
    },
    obtenerEnteroRandomEntre(rango1, rango2){
        return Math.max(Math.floor(Math.random() * rango2) + 1, rango1);
    },
    cssEvento(turno) {
        return {
            'player-turno': turno.esJugador,
            'monster-turno': !turno.esJugador
        }
    }
    }
});