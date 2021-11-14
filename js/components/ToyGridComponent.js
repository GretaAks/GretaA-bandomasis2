class ToyGridComponent {
    constructor() {
      this.state = {
        loading: false,
        toys: []
      }
      this.init();
    }
  
    fetchToys = () => API.fetchToys(this.saveToys, alert);
  
    saveToys = (toys) => {
        this.state.toys = toys;
        this.state.loading= false;

        this.render();
    };

    showError = (err) => alert(err);
  
  
    init = () => {
      this.state.loading = true;
      this.fetchToys();
      this.htmlElement = document.createElement('div');
  
      this.render();
    }
  
  
    render = () => {
        const {loading,toys} = this.state;
        if (loading) {
            this.htmlElement.innerHTML = 'siunčiama...';
        }else {
            this.htmlElement.innerHTML = 'parsiųsta!';
        }
    }
  }


