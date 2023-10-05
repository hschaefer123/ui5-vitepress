# Declarative Diagramming
Modern tools that turn text to diagrams.
[Community list of comparisons
between Text to Diagram tools](https://text-to-diagram.com/){class="learn-more"}

## PlantUML ![PlantUML Logo](/icons/logo/PlantUML.svg){class="u-right-brand"}

>[PlantUML](https://plantuml.com/en/) is an open-source tool allowing users to create diagrams from a plain text language. Besides various [UML](https://en.wikipedia.org/wiki/Unified_Modeling_Language) diagrams, PlantUML has support for various other software development related formats (such as Archimate, Block diagram, BPMN, C4, Computer network diagram, ERD, Gantt chart, Mind map, and WBD), as well as visualisation of [JSON](https://plantuml.com/en/json) and [YAML](https://plantuml.com/en/yaml) files.

[Ashley’s PlantUML Documentation](https://plantuml-documentation.readthedocs.io/en/latest/index.html){class="learn-more"}
[Wikipedia](https://en.wikipedia.org/wiki/PlantUML){class="learn-more"}

### Plugin <Badgen package="markdown-it-plantuml" style="float:right"/>
Plugin for creating block-level uml diagrams for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

### Sequence Diagram
Use the following code

````ts
```plantuml
bob -> Alice : hello
```
````

to genrate a diagram like this

```plantuml
bob -> Alice : hello
```

### CDS Data Model
The [Data Model](https://help.sap.com/viewer/923180ddb98240829d935862025004d6/Cloud/en-US/c4aaecac48294ef1a39ef13de0706a4b.html) comprises the description of the different entities involved in a business scenario. 

It distinguishes between:
Type | Description
:--: | -----------
Main business entities | Compositions<br>are used to model document structures through “contained-in” relationships, also supporting Cascaded Delete. 
Secondary business entities | Associations

```plantuml
' theming
skinparam shadowing false
skinparam ArrowColor #black
skinparam linetype ortho
'skinparam handwritten true
' main business entities
rectangle Travel #lightskyblue
rectangle Booking #lightskyblue
' secondary business entities
rectangle Customer #white
rectangle Agency #white
rectangle Flight #white
' associations (control alignment with - (inline) or -- (next level))
Customer <-- Travel
Customer <-- Booking
Booking -> Travel
Travel --> Agency
Booking --> Flight
' legend
legend center
|  <#lightskyblue>  | Main business entitites |
|  <#white>  | Secondary business entities |
endlegend
```

```ts
@startuml
' theming
skinparam shadowing false
skinparam ArrowColor #black
skinparam linetype ortho
' main business entities
rectangle Travel #lightskyblue
rectangle Booking #lightskyblue
' secondary business entities
rectangle Customer #white
rectangle Agency #white
rectangle Flight #white
' associations 
' control alignment with - (inline) or -- (next level)
Customer <-- Travel
Customer <-- Booking
Booking -> Travel
Travel --> Agency
Booking --> Flight
' legend
legend center
|  <#lightskyblue>  | Main business entitites |
|  <#white>  | Secondary business entities |
endlegend
@enduml
``` 
