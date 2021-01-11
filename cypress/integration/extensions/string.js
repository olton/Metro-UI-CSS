import '../../../build/js/metro';

describe('Metro 4 String extension', () => {
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