# Languages
VitePress uses [Markdown-it](https://github.com/markdown-it/markdown-it) as the parser, and [Shiki](https://shiki.matsu.io/) to highlight language syntax. 

## Markdown-it <Badgen package="markdown-it" style="float:right"/>
Markdown parser done right. Fast and easy to extend.

## Shiki <Badgen package="shiki" style="float:right"/>
Shiki is a beautiful Syntax Highlighter that uses [TextMate](https://macromates.com/) grammars from sources like [VS Code](https://github.com/microsoft/vscode) and handpicked from [git](https://github.com/shikijs/shiki/blob/main/scripts/grammarSources.ts).

### Default Languages

::: details Default Languages
```ts
export type Lang =
  | 'abap'
  | 'actionscript-3'
  | 'ada'
  | 'apache'
  | 'apex'
  | 'apl'
  | 'applescript'
  | 'ara'
  | 'asm'
  | 'astro'
  | 'awk'
  | 'ballerina'
  | 'bat' | 'batch'
  | 'beancount'
  | 'berry' | 'be'
  | 'bibtex'
  | 'bicep'
  | 'blade'
  | 'c'
  | 'cadence' | 'cdc'
  | 'clarity'
  | 'clojure' | 'clj'
  | 'cmake'
  | 'cobol'
  | 'codeql' | 'ql'
  | 'coffee'
  | 'cpp'
  | 'crystal'
  | 'csharp' | 'c#' | 'cs'
  | 'css'
  | 'cue'
  | 'cypher' | 'cql'
  | 'd'
  | 'dart'
  | 'dax'
  | 'diff'
  | 'docker' | 'dockerfile'
  | 'dream-maker'
  | 'elixir'
  | 'elm'
  | 'erb'
  | 'erlang' | 'erl'
  | 'fish'
  | 'fsharp' | 'f#' | 'fs'
  | 'gdresource'
  | 'gdscript'
  | 'gdshader'
  | 'gherkin'
  | 'git-commit'
  | 'git-rebase'
  | 'glimmer-js' | 'gjs'
  | 'glimmer-ts' | 'gts'
  | 'glsl'
  | 'gnuplot'
  | 'go'
  | 'graphql'
  | 'groovy'
  | 'hack'
  | 'haml'
  | 'handlebars' | 'hbs'
  | 'haskell' | 'hs'
  | 'hcl'
  | 'hjson'
  | 'hlsl'
  | 'html'
  | 'http'
  | 'imba'
  | 'ini' | 'properties'
  | 'java'
  | 'javascript' | 'js'
  | 'jinja-html'
  | 'jison'
  | 'json'
  | 'json5'
  | 'jsonc'
  | 'jsonl'
  | 'jsonnet'
  | 'jssm' | 'fsl'
  | 'jsx'
  | 'julia'
  | 'kotlin'
  | 'kusto' | 'kql'
  | 'latex'
  | 'less'
  | 'liquid'
  | 'lisp'
  | 'logo'
  | 'lua'
  | 'make' | 'makefile'
  | 'markdown' | 'md'
  | 'marko'
  | 'matlab'
  | 'mdc'
  | 'mdx'
  | 'mermaid'
  | 'mojo'
  | 'narrat' | 'nar'
  | 'nextflow' | 'nf'
  | 'nginx'
  | 'nim'
  | 'nix'
  | 'objective-c' | 'objc'
  | 'objective-cpp'
  | 'ocaml'
  | 'pascal'
  | 'perl'
  | 'php'
  | 'plsql'
  | 'postcss'
  | 'powerquery'
  | 'powershell' | 'ps' | 'ps1'
  | 'prisma'
  | 'prolog'
  | 'proto'
  | 'pug' | 'jade'
  | 'puppet'
  | 'purescript'
  | 'python' | 'py'
  | 'r'
  | 'raku' | 'perl6'
  | 'razor'
  | 'reg'
  | 'rel'
  | 'riscv'
  | 'rst'
  | 'ruby' | 'rb'
  | 'rust' | 'rs'
  | 'sas'
  | 'sass'
  | 'scala'
  | 'scheme'
  | 'scss'
  | 'shaderlab' | 'shader'
  | 'shellscript' | 'bash' | 'sh' | 'shell' | 'zsh'
  | 'shellsession' | 'console'
  | 'smalltalk'
  | 'solidity'
  | 'sparql'
  | 'splunk' | 'spl'
  | 'sql'
  | 'ssh-config'
  | 'stata'
  | 'stylus' | 'styl'
  | 'svelte'
  | 'swift'
  | 'system-verilog'
  | 'tasl'
  | 'tcl'
  | 'tex'
  | 'toml'
  | 'tsx'
  | 'turtle'
  | 'twig'
  | 'typescript' | 'ts'
  | 'v'
  | 'vb' | 'cmd'
  | 'verilog'
  | 'vhdl'
  | 'viml' | 'vim' | 'vimscript'
  | 'vue-html'
  | 'vue'
  | 'vyper' | 'vy'
  | 'wasm'
  | 'wenyan' | '文言'
  | 'wgsl'
  | 'wolfram'
  | 'xml'
  | 'xsl'
  | 'yaml' | 'yml'
  | 'zenscript'
  | 'zig'
``
:::

### Pre-configured
The following languages are ``Pre-configured`` and can be used also:

::: code-group

```cds [CAP CDS]
annotate my.Entity with {
    MyProperty @Common : {
        Text            : MyPropertyTextPropertyPath,
        TextArrangement : #TextOnly
    };
}
```

```abapcds [ABAP CDS]
define view <ViewName> as select from <data_source> {
    @ObjectModel.text.Element: ['MyPropertyTextPropertyPath']
    @UI.textArrangement: #TEXT_ONLY
    MyProperty,

    // Maybe you have to flatten deep text links
    // (currently not supported in RAP)
    to_Text.MyPropertyTextPropertyPath as MyPropertyTextPropertyPath
}
```

```csv [CSV]
SalesOrder,SalesOrderItem,Status
1000000000,00010,A
```

```csvs [CSVS]
SalesOrder;SalesOrderItem;Status
1000000000;00010;A
```

```http [HTTP/REST]
@host = http://localhost:4004

# @name helloWorld
GET {{host}}/say/hello(to='world')
```

::: 

There are also some additional ``log`` and ``d2`` grammars inside the syntaxes folder, but not configured.

### Custom
You can add a [new language](https://github.com/shikijs/shiki/blob/main/docs/languages.md#supporting-your-own-languages-with-shiki) to your shiki instance by using the JSON version of your tmLanguage files.

Just add the JSON file to the folder ``./vitepress/syntaxes/<syntax_identifier>.tmLanguage.json``<br> 
and configure it inside<br>
``./vitepress/config.ts``:

```ts
import { defineConfig } from "vitepress";
import { join } from "node:path";

export default defineConfig({
    markdown: {
        languages: [
            {
                id: "<syntax_identifier>",
                scopeName: "source.abapcds<syntax_identifier>",
                path: join(__dirname, 
                    "syntaxes/<YourSyntax>.tmLanguage.json"
                ),
                aliases: ['<syntax_identifier>']
            },
            ...
        ]
    }
}
```