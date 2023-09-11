# adapt-text-widow

**adapt-text-widow** is an extension that will prevent a single word that appears on the paragraph-ending line.

**attributes** 
- class **text-widow** will be added on **ARTICLE** 
- for popup on component **component-textwidow** class will be added on **COMPONENT** 

**_isEnabled** (boolean): True or False
- the option checkbox is located on **ARTICLE** and by default its **TRUE**
- if **TRUE** descendants of **ARTICLE** which is **BLOCK** and **COMPONENT** will also be **TRUE**

## Disabling text-widow
- if you want to disable text-widow on one of the elements **ARTICLE**, **BLOCK** or **COMPONENT**, 
just add this **disabled-textwidow** class on custom classes on the page editor of **ARTICLE**, **BLOCK** or **COMPONENT**.

## Limitations
- To be completed.
**notify-popup** is still on progress

## NOTE
- TESTED ON **ADAPT AUTHORING VERSION 0.6.1** AND **ADAPT FRAMEWORK VERSION 2.4.0**.