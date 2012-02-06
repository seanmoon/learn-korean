describe("Quiz", function() {
  var quiz;

  beforeEach(function() {
    quiz = new Quiz();
  });

  it("should be", function() {
    expect(quiz).toNotBe(null);
  });

  function initializeQuiz(quiz) {
    quiz.initialize($("<input></input>"), $("<div></div>"), $("<div></div>"));
  }

  describe("initialization", function() {
    beforeEach(function() {
      initializeQuiz(quiz);
    });

    it("should save the elements", function() {
      expect(quiz.inputEl).toBeDefined();
      expect(quiz.solutionEl).toBeDefined();
      expect(quiz.hintEl).toBeDefined();
    });

    it("should bind a keyDown handler to inputEl", function() {
      expect(quiz.inputEl.data('events').keydown.length).toBe(1);
    });
  });

  describe("#start", function() {
    var words;
    beforeEach(function() {
      words = [{hint:"one",solution:"1"},{hint:"two",solution:"2"}];
      initializeQuiz(quiz);
      quiz.start(words);
    });

    it("should set the hint and solution", function() {
      expect(quiz.hintEl.html()).toBe("one");
      expect(quiz.solutionEl.html()).toBe("1");
    });

    it("should save the rest of the words", function() {
      expect(quiz.words.length).toBe(1);
      expect(quiz.words.shift()).toEqual({hint:"two",solution:"2"});
    });
  });

  describe("enter key event handled", function() {
    beforeEach(function() {
      words = [{hint:"one",solution:"1"},{hint:"two",solution:"2"}];
      initializeQuiz(quiz);
      quiz.start(words);
    });

    describe("when the input matches the solution", function() {
      beforeEach(function() {
        quiz.inputEl.val("1");
        quiz.checkMatch();
      });

      it("should advance to the next word", function() {
        expect(quiz.words.length).toBe(0);
        expect(quiz.hintEl.html()).toBe("two");
        expect(quiz.solutionEl.html()).toBe("2");
      });

      it("should clear the input", function() {
        expect(quiz.inputEl.val()).toBe("");
      });

      it("should blur and refocus the input", function() {
        // TODO: how to test this?
      });
    });

    describe("when the input doesn't match the solution", function() {
      beforeEach(function() {
        quiz.inputEl.val("not 1");
        quiz.checkMatch();
      });

      it("shouldn't advance to the next word", function() {
        expect(quiz.words.length).toBe(1);
      });
    });
  });
});
