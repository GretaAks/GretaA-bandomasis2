class ToyGridComponent {
    constructor() {
      this.state = {
        loading: false,
        toys: []
      }
      this.init();
    }
  
    fetchToys = () => API.fetchToys(
        (toys) => {
            this.state.loading = false;
            this.saveToys(toys);
        },
        (err) => {
            alert(err);
            this.state.loading = false;
            this.render();

        }
        
    )
  
    saveToys = (toys) => {
        this.state.toys = toys;
        this.state.loading= false;

        this.render();
    };

    showError = (err) => alert(err);

    wrapColumn = (element) => {
        const column = document.createElement('div');
        column.className = 'col-12 col-sm-6 col-lg-4 col-xl-3';
        column.appendChild(element);
        return column;
      }

      deleteToys = (id) => {
        API.deleteToys(
          id,
          () => API.fetchToys(this.saveToys, alert),
          alert
        );
      }
  
  
    init = () => {
      this.state.loading = true;
      this.fetchToys();
      this.htmlElement = document.createElement('div');
      this.htmlElement.className = 'row g-4';
  
      this.render();
    }
  
  
    render = () => {
        const {loading,toys} = this.state;
        if (loading) {
            this.htmlElement.innerHTML = `<div class="text-center"><img src="assets/loading.gif"/</div>`;
        }else if (toys.length > 0) {
            this.htmlElement.innerHTML = '';
            const toyElement = toys
            .map(({ id, ...props }) => new ToyCardComponent({
                ...props,
                onDelete: () => this.deleteToys(id)
              }))
            .map (x => x.htmlElement)
            .map (this.wrapColumn);
            this.htmlElement.append(...toyElement)
        }else {
        this.htmlElement.innerHTML = `<h2>Šiuo metu žaislų neturime</h2>`;
        }
    }
}


