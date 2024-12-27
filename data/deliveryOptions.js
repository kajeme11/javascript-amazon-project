export const deliveryOptions = [
    {
        id:'1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id:'2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id:'3',
        deliveryDays: 1,
        priceCents: 999
    },
];

export function getDeliveryOptions(id){
    let delOption;
    deliveryOptions.forEach((option) => {
        if(id === option.id){
            delOption = option;
        }
    });
    return delOption || deliveryOptions[0];
}