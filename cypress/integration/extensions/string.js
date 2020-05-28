import '../../../build/js/metro';

describe('Metro 4 String extension', () => {
    it('camelCase', () => {
        assert.equal('camel-case'.camelCase(), 'camelCase');
    })
    it('dashedName', () => {
        assert.equal('camelCase'.dashedName(), 'camel-case');
    })
    it('shuffle', () => {
        assert.notEqual('camelCase'.shuffle(), 'camelCase');
    })
    it('capitalize', () => {
        assert.equal('camelCase'.capitalize(), 'CamelCase');
    })
    it('contains: xxx not in', () => {
        assert.equal('contains'.contains('xxx'), false);
    })
    it('contains: ain present', () => {
        assert.equal('contains'.contains('ain'), true);
    })
    it('includes: xxx not in', () => {
        assert.equal('includes'.includes('xxx'), false);
    })
    it('includes: clu present', () => {
        assert.equal('includes'.includes('clu'), true);
    })
    it('toDate', () => {
        assert.equal('12-21-1972'.toDate().getMonth(), 11);
    })
    it('toDate with format', () => {
        assert.equal('21-12-1972'.toDate('%d-%m-%y').getMonth(), 11);
    })
    it('toDate with locale', () => {
        assert.equal('21-гру-1972'.toDate('%d-%m-%y', 'uk-UA').getMonth(), 11);
    })
    it('toArray', () => {
        const a = ['21', 'гру', '1972'];
        '21-гру-1972'.toArray('-').forEach(function(el, i){
            assert.equal(el, a[i]);
        })
    })
    it('toArray formatted', () => {
        const a = [21, 12, 1972];
        '21-12-1972'.toArray('-', 'number').forEach(function(el, i){
            assert.equal(el, a[i]);
        })
    })
    it('toArray formatted mixed values', () => {
        const a = [21, 'гру', 1972];
        '21-гру-1972'.toArray('-', 'number').forEach(function(el, i){
            assert.equal(el, a[i]);
        })
    })
});