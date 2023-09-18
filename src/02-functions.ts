import {Friend, Colleague, EmailContact } from './myTypes'
import { friends, colleagues } from "./01-basics";

function older(f: Friend) : string {
    f.age += 1
    return `${f.name} is now ${f.age}` 
}

function allOlder(f:Friend[]) : string[] {
    let output:string[] = []
    for (var val of f){
        output.push(older(val))
    }
    return output;
}

console.log(older(friends[0]))
console.log(allOlder(friends))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]) { // Inferred return type
    const result = cs.sort(
      (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
  }

console.log(highestExtension(colleagues.current));

function addColleague(cs: Colleague[], cname : string, cdepartment: string, cemail: string) {
    const colleague:Colleague = {
        name: cname,
        department: cdepartment,
        contact: {
            email: cemail,
            extension: highestExtension(cs).contact.extension + 1
        }
    }
    cs.push(colleague)
}

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number
  ): EmailContact[] {
    const sorted = colleagues.sort(sorter); // Colleague[] inferred
    const result: EmailContact[] = sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
    return result 
  }
  
  console.log(sortColleagues(colleagues.current, (a, b) => a.contact.extension - b.contact.extension));
  console.log(sortColleagues(colleagues.current, (a, b) => a.name.length - b.name.length));

  function findFriends(friends: Friend[],
    filter: (f1: Friend) => boolean) : string[]{
    const sorted = friends.filter(filter);
    const result = sorted.map(f1 => f1.name);
    return result
  }

  console.log(findFriends(friends, (friend) => friend.name.startsWith('Co')));
  console.log(findFriends(friends, (friend) => friend.age < 35));