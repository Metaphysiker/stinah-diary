db.entries.find({}).forEach(function(entry){
  db.entries.update(
    {_id: entry._id},
    {$set:{animal: ObjectId(entry.animal_id)}}
)});
