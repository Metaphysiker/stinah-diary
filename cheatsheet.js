db.entries.find({}).forEach(function(entry){
  db.entries.update(
    {_id: entry._id},
    {$set:{animal: ObjectId(entry.animal_id)}}
)});


db.files.find({}).forEach(function(file){
  db.files.update(
    {_id: file._id},
    {$set:{entry: ObjectId(entry.entry_id)}}
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
