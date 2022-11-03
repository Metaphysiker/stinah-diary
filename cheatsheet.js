categories = ["work", "vet", "shop"]

db.entries.find({}).forEach(function(entry){
  db.entries.update(
    {_id: entry._id},
    {$set:{animal: ObjectId(entry.animal_id)}}
)});


db.files.find({}).forEach(function(file){
  db.files.update(
    {_id: file._id},
    {$set:{entry: ObjectId(file.entry_id)}}
)});


db.users.updateOne({email: "s.raess@me.com"}, {$set: {get_daily_updates: "true"}})

db.users.updateOne({email: "steiger@stinah.ch"}, {$set: {get_daily_updates: "true"}})

db.todos.find({}).forEach(function(file){
  db.files.update(
    {_id: file._id},
    {$set:{category: "work"}}
)});


-------------------------

fs.access(path.join(__dirname, '../uploads/'), (error) => {
  if (error) {
    fs.mkdirSync(path.join(__dirname, '../uploads/'));
  }
});

if (!req.files || Object.keys(req.files).length === 0) {
  //console.log('No files were uploaded.');
} else {
  //console.log('files are present.');
}

------------------------

ng build --localize && node app.js

localhost:3000/de

https://phrase.com/blog/posts/angular-localization-i18n/
