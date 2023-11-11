import Indecision from "@/components/Indecision.vue";
import { shallowMount } from "@vue/test-utils";

describe('Test Indecision', () => {

    let wrapper;
    let clgSpy;

    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            answer: 'Yes',
            forced: 'false',
            image: 'https://yesno.wtf/assets/yes/2.gif'
        })
    }));

    beforeEach(() => {
        wrapper = shallowMount(Indecision);
        clgSpy = jest.spyOn(console, 'log');
        jest.clearAllMocks();
    });
    
    it('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('escribir en el input no debe de disparar nada {console.log}', async() => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');
        const input = wrapper.find('input');
        await input.setValue('Hola Mundo');
        expect(clgSpy).toHaveBeenCalledTimes(1);
        expect(getAnswerSpy).not.toHaveBeenCalled();
    });

    it('escribir el simbolo de "?" debe de disparar el getAnswer', async() => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');
        const input = wrapper.find('input');
        await input.setValue('Hola?');
        expect(clgSpy).toHaveBeenCalledTimes(1);
        expect(getAnswerSpy).toHaveBeenCalled();
    });

    it('pruebas getAnswer', async() => {
        await wrapper.vm.getAnswer();
        // console.log(wrapper.vm.img)
        // console.log(wrapper.vm.answer)
        const img = wrapper.find('img');
        expect(img.exists()).toBeTruthy();
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif');
        expect(wrapper.vm.answer).toBe('Si!')
    });

    it.only('pruebas de getAnswer - Falla en el API',async() => {
        fetch.mockImplementationOnce(() => Promise.reject('Api is down'));
        await wrapper.vm.getAnswer();
        const img = wrapper.find('img');
        expect(img.exists()).toBeFalsy();
        expect(wrapper.vm.answer).toBe('No se pudo cargar del API');
    });
});