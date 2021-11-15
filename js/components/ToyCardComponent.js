class ToyCardComponent {
    static USD_EUR = 0.87;

    constructor (props) {
        this.props=props;
        this.init();
    }

    formatedBadge = (x) => `<span class="badge rounded-pill bg-danger ms-4">${x}</span>`;

    formatePrice = () => {
        const {
          price: { currency, amount },
          discount: { type, amount: value }
        } = this.props;
    
        let finalPrice;
        let discountBadge = '';
        switch (type) {
          case 'amount':
            finalPrice = (amount - value).toFixed(2);
            discountBadge = this.formatedBadge(`-${value} ${currency}`);
            break;
          case 'toFixed':
            finalPrice = value;
            break;
          case 'percentage':
            finalPrice = Math.round(100 * amount * (1 - value / 100)) / 100;
            discountBadge = this.formatedBadge(`-${value} %`);;
            break;
        }
    
        return `
        <span>
          <span>${amount} ${currency}</span>
          <br>
          <strong>${finalPrice} ${currency} ${discountBadge}</strong>
        </span>`;
      }

      

    formatedAgeRestriction = () => {
        const { ageRestrictions } = this.props;
        return ageRestrictions
          ? `<div>Age: ${ageRestrictions.from}+</div>`
          : '';
      }


    init = () => {
        const {title,price,ageRestrictions,discount,imgSrc,onDelete} = this.props;
        const {amount, currency} = price;
        

        const finalPrice = currency === '$' ? amount / ToyCardComponent.USD_EUR : amount;
        const formatedPrice = Math.round(100 * finalPrice) / 100 + ' €';

        this.htmlElement= document.createElement('article');
        this.htmlElement.className = 'card p-3 shadow';
        this.htmlElement.innerHTML = `
        <img src="${imgSrc}" class="card-img-top"/ height="200px" style="object-fit: cover">
        <div class="card-body">
        <h2 class="h5">${title}</h2>
        <div>
          <span>Kaina</span>:
          <strong>${this.formatePrice()}</strong>
        </div>
        <div>
          <strong>${this.formatedAgeRestriction()}</strong>
          </div>
          <div class="text-center pt-4">
          <button class= "btn text-center btn-success">Ištrinti</button>
          </div>
      
      `;
      const btn = this.htmlElement.querySelector('.btn');
      btn.addEventListener('click', onDelete);
    }
}

