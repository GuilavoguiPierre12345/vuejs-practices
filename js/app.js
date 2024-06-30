// création d'une instance de vue Js 3
const app = Vue.createApp({
    data() {
        return {
            isConnected: false,
            btnLibelle: 'Connexion',
            author: 'Les pros...',
            age: 20,
            bio: 'Un gars très passionné par le dev web',
            x : 0,
            y : 0,
            mouseover : '',
            mouseleave : '',
            dblclick : '',
            mousemove : '',
            frinds : [
                {name: 'Guilavogui',link : 'https://guilavogui.com',image:'assets/img/avatar-1.png',isFrind : true,btnTxt:'Bloqué',classvalue : 'btn btn-outline-primary m-1 w-100',},
                {name: 'Sakouvogui',link : 'https://sakouvogui.com',image:'assets/img/avatar-2.jpg',isFrind : true,btnTxt:'Bloqué',classvalue : 'btn btn-outline-primary m-1 w-100',},
                {name: 'Kalivogui',link : 'https://kalivogui.com',image:'assets/img/avatar-3.png',isFrind : true,btnTxt:'Bloqué',classvalue : 'btn btn-outline-primary m-1 w-100',},
                {name: 'Toupou',link : 'https://toupou.com',image:'assets/img/avatar-4.png',isFrind : true,btnTxt:'Bloqué',classvalue : 'btn btn-outline-primary m-1 w-100',},
            ]
        }
    },
    methods: {
        augmenterAge(){
            this.age++
        },
        diminuerAge(){
            this.age--
        },
        connexion(){
            if (this.isConnected) {
                this.isConnected = false
                this.author = 'Les pros...'
                this.btnLibelle = 'Connexion'
            }else {
                this.author = 'Guilavogui Foromo'
                this.btnLibelle = 'Deconnexion'
                this.isConnected = true
            }
            
        },
        mouseOver(e){
            console.log(`Event type : ${e.type}`);
            if(e.type === 'mouseover')
                this.mouseover = e.type
        },
        mouseLeave(e){
            console.log(`Event type : ${e.type}`);
            if(e.type === 'mouseleave')
                this.mouseleave = e.type
            
                
        },
        dblClick(e){
            console.log(`Event type : ${e.type}`);
            if(e.type === 'dblclick')
                this.dblclick = e.type
        },
        deplacement(e){
            this.x = e.offsetX
            this.y = e.offsetY
            if(e.type === 'mousemove')
                this.mousemove = e.type
        },
        definirEtat(i){
            if(this.frinds[i].isFrind){
                this.frinds[i].isFrind = false
                this.frinds[i].btnTxt = 'Débloqué'
                this.frinds[i].classvalue = 'btn btn-outline-danger m-1 w-100'
            }else {
                this.frinds[i].isFrind = true
                this.frinds[i].btnTxt = 'Bloqué'
                this.frinds[i].classvalue = 'btn btn-outline-primary m-1 w-100'
            }
        }
    },
})
// montage de l'instance de vue à l'element html qui à pour id app
app.mount("#app")