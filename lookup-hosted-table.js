// This implementation assumes that the lookup table has been added to map
var decode_table = FeatureSetById($map, "19db67a01eb-layer-64"); // reference table
var output = [];

function decode(pos, char) { // helper function for decoding each character
  var result = First(Filter(decode_table, "position = @pos AND code = @char"));
  return IIf(IsEmpty(result), char, result.code_label);
}

for (var i in $feature.LandUse1) {
  var char = $feature.LandUse1[i]; // code character (i.e. "R", "3")
  var desc = decode(i + 1, char); // description "Residential"

  if (!IsEmpty(desc)) { // if code is null or empty it is skipped
    Push(output, desc);
  }
}

return Concatenate(output, " / ");
