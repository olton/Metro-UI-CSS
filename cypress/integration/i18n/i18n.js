import '../../../build/js/metro';

const locales = Metro.locales;

describe("Metro 4 :: i18n", () => {
    it('Test cn-ZH', ()=>{
        assert.equal(locales['cn-ZH'].buttons.reset, "重啟");
    });
    it('Test de-DE', ()=>{
        assert.equal(locales['de-DE'].buttons.reset, "Zurücksetzen");
    });
    it('Test en-US', ()=>{
        assert.equal(locales['en-US'].buttons.reset, "Reset");
    });
    it('Test es-MX', ()=>{
        assert.equal(locales['es-MX'].buttons.reset, "Reiniciar");
    });
    it('Test fr-FR', ()=>{
        assert.equal(locales['fr-FR'].buttons.reset, "Réinitialiser");
    });
    it('Test hu-HU', ()=>{
        assert.equal(locales['hu-HU'].buttons.reset, "Visszaállítás");
    });
    it('Test it-IT', ()=>{
        assert.equal(locales['it-IT'].buttons.reset, "Reset");
    });
    it('Test pt-BR', ()=>{
        assert.equal(locales['pt-BR'].buttons.reset, "Restaurar");
    });
    it('Test ru-RU', ()=>{
        assert.equal(locales['ru-RU'].buttons.reset, "Сброс");
    });
    it('Test tw-ZH', ()=>{
        assert.equal(locales['tw-ZH'].buttons.reset, "重啟");
    });
    it('Test uk-UA', ()=>{
        assert.equal(locales['uk-UA'].buttons.reset, "Скинути");
    });
});