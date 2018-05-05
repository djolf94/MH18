//nas paket za autentifikaciju

export default function (Vue) {
    Vue.auth = {
        //samo upise username ulogovanog usera u localStorage
        setUserLS(userName) {
            localStorage.setItem('logedUser', userName);
        },
        getUserLS() {
            var userName = localStorage.getItem('logedUser');

            //ako niko nije ulogovan
            if (!userName)
                return null;
            
            return userName;
        },
        //pozivamo kad idemo log out
        destroyUserLS() {
            localStorage.removeItem('logedUser');
        },
        //da li je user autentifikovan
        isAuthenticated() {
            if (this.getUserLS())
                return true;
            else   
                return false;
        }
    }
    
    //definisemo properti $auth koji koristimo posle
    //kao this.$auth ili Vue.auth ako nismo u nekoj Vue komponenti
    Object.defineProperties(Vue.prototype, {
        $auth: {
            get: () => {
                return Vue.auth;
            }
        }
    });
}