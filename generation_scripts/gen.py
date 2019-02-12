import json
from googletrans import Translator
from pprint import pprint
from num2words import num2words
import time
translator = Translator();

def find(key, dictionary):
    for k, v in dictionary.iteritems():
        if k == key:
            yield v
        elif isinstance(v, dict):
            for result in find(key, v):
                yield result
        elif isinstance(v, list):
            for d in v:
                for result in find(key, d):
                    yield result

def gen_handler(file,name,data):
    with open(file+'.js','w') as f:
        f.write('const ' +name+' = {\n')
        i=int(0);
        for d in (data['translation']['questions']):
            j = int(0);
            for a in (['1','2','3','4']):
                try:
                    f.write("'"+"Q_"+num2words(i)+'_'+num2words(j)+"':function(){\ncheck_answer(this,"+str(i)+","+str(j)+");\n"+"},\n");
                except:
                    print("ascii error");
                j+=1;
            i+=1;
            
        f.write("};");
    return

def gen_schema(file,data):
    with open(file+'.json','w') as f:
        i=int(0);
        for d in (data['translation']['questions']):
            j=int(0);
            for a in (['1','2','3','4']):
                try:
                    f.write('{\n"name":"Q_'+num2words(i)+'_'+num2words(j)+'",\n"samples":[\n')
                    f.write('"'+d['answers'][a].replace(',',' ').replace('/',' ').replace('?',' ').replace('-',' ').replace('.',' ')+'"]\n},\n');
                except:
                    print("error ascii");
                j+=1;
            i+=1;
    return

debug = 1
data = [];
trans = [];
lang = [str('fr')];
with open('test.json') as f:
    data = json.load(f)
    trans = data.copy()
    
for ln in lang:
    trans = data.copy();
    for f in (trans['translation']['questions']):
        for q in (find('text',f)):
           if(debug):
            q = translator.translate(q,dest=ln).text;
            time.sleep(0.5);
           print(q);
        for a in (['1','2','3','4']):
            if(debug):
                f['answers'][a] = translator.translate(f['answers'][a],dest=ln).text;
            print(f['answers'][a]);
    for key,val in trans['translation'].iteritems():
        if(key == 'questions'):
            continue;
        if(debug):
            try:
                val = translator.translate(val,dest=ln).text;
            except:
                print(val);
        print(val);
    with open(ln+'.json','w') as fi:
        fi.write(json.dumps(trans,indent=4, sort_keys=False));
    gen_schema('model'+ln,trans);
gen_handler('handy','handlers',data);
