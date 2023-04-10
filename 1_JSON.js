const jsonString = `
{
 "list": [
   {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

const data = JSON.parse(jsonString);
const list = data.list;
const list2 = [];

for(let i = 0; i < list.length; i++){
  list2.push(`{name: '${list[i].name}' , age: ${Number(list[i].age)} , prof: '${ list[i].prof}}'`)
};

const result = {
  list: list2
};
console.log(result);