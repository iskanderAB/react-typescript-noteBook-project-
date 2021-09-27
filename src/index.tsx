import { useState ,useEffect ,useRef} from "react";
import ReactDOM  from "react-dom";
import * as esbuild from 'esbuild-wasm';

const App =() => { 
    const [input , setInput] = useState('');
    const [code , setCode] = useState('');
    const refService = useRef<any>()
    const startService = async () => {
        refService.current = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm' 
        });
    }
    const onClick = async () => { 
        if (!refService.current)
            return;
            
        const result = await refService.current.transform(input,{
            loader : 'jsx',
            target : 'es2015'
        });
        setCode(result.code); // result is object {code '' , map : '' , worning :''} 
    } 

    useEffect(()=> {
        startService();
    } ,[])
    return <div>
        <textarea value={input} onChange={e => setInput(e.target.value)} />
        <div>
            <button onClick={onClick}> Click♥ </button>
        </div>
        <pre>
            {code}
        </pre>
    </div>
}
ReactDOM.render(
    <App/> , 
    document.querySelector('#ApplicationRoot')
);