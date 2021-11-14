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
            this.htmlElement.innerHTML = `<div class="text-center"><img src="assets/loading.gif"/</div>`;
        }else if (toys.length > 0) {
            this.htmlElement.innerHTML = '';
            const toyElement = toys
            .map (x => new ToyCardComponent(x))
            .map (x => x.htmlElement);
            this.htmlElement.append(...toyElement)
        }else
        this.htmlElement = `<h2>Šiuo metu žaislų neturime</h2>`;
        }
    }
  


