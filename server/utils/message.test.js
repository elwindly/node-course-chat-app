var expect = require('expect');
var {generateMessage} = require('./message');



describe('generateMessage',()=>{

    it('should generate correct message object',()=>{
        var message = {
            from: 'Laci',
            text:'This should work'
        };
        var res  =generateMessage(message.from,message.text);
        expect(res).toBeA('object').toInclude({
            from:message.from,
            text:message.text,
            
        });
        expect(res.createdAt).toBeA('number');
       
    });


});