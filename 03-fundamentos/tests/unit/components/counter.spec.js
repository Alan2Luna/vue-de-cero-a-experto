import { shallowMount } from "@vue/test-utils"
import Counter from "@/components/Counter.vue"

describe('Counter Component', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Counter);
    });

    // it('debe de hacer match con el snapshot', () => {
    //     const wrapper = shallowMount(Counter);
    //     expect(wrapper.html()).toMatchSnapshot();
    // })

    it('h2 debe tener el valor por defecto "Counter"', () => {
        expect(wrapper.find('h2').exists).toBeTruthy();
        const h2Value = wrapper.find('h2').text();
        expect(h2Value).toBe('Counter');
    });

    it('el valor por defecto debe ser 100 en el p', () => {
        const value = wrapper.find('[data-testid="counter"]').text();
        expect(value).toBe('100');
    });

    it('debe de incrementar y decrementar el valor del contador', async() => {
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button');
        await increaseBtn.trigger('click');
        await increaseBtn.trigger('click');
        await increaseBtn.trigger('click');
        await decreaseBtn.trigger('click');
        await decreaseBtn.trigger('click');
        const value = wrapper.find('[data-testid="counter"]').text();
        expect(value).toBe('101');
    });

    it('debe de estable el valor por defecto', () => {
        const start = wrapper.props('start');
        const value = wrapper.find('[data-testid="counter"]').text();
        expect(Number(value)).toBe(start);
    })

    it('debe de mostar la prop title', () => {
        const title = 'New title'
        const wrapper = shallowMount(Counter, {
            props: {
                title
            }
        })
        expect(wrapper.find('h2').text()).toBe(title);
    });

})