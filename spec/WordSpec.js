describe("Word", function() {
  var word;

  beforeEach(function() {
    word = new Word();
  });

  it("should be", function() {
    expect(word).toBeDefined();
  });

  describe(".firstSet", function() {
    it("should return a list of words", function() {
      expect(Word.firstSet.length).toBeGreaterThan(1);
    });
  });

  describe(".oneWordSet", function() {
    it("should return a list of one word", function() {
      expect(Word.oneWordSet.length).toBe(1);
    });
  });
});
