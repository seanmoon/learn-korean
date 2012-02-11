describe("Quiz", function() {
  var quiz;

  beforeEach(function() {
    quiz = new Quiz();
  });

  it("should be", function() {
    expect(quiz).toNotBe(null);
  });

  function initializeQuiz(quiz) {
    quiz.initialize($("<input></input>"), $("<div></div>"), $("<div></div>"), $("<div></div>"), $("<div></div>"));
  }

  describe("initialization", function() {
    beforeEach(function() {
      initializeQuiz(quiz);
    });

    it("should save the elements", function() {
      expect(quiz.inputEl).toBeDefined();
      expect(quiz.solutionEl).toBeDefined();
      expect(quiz.hintEl).toBeDefined();
      expect(quiz.statusEl).toBeDefined();
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

      it("should change the status to correct", function() {
        expect(quiz.statusEl.html()).toBe("correct!");
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

      it("should change the status to incorrect", function() {
        expect(quiz.statusEl.html()).toBe("incorrect!");
      });
    });
  });

  describe("keyup event handled", function() {
    var retVal;

    beforeEach(function() {
      words = [{hint:"one",solution:"1"},{hint:"two",solution:"2"}];
      initializeQuiz(quiz);
      quiz.start(words);
    });

    describe("when the last character of the input is a question mark", function() {
      beforeEach(function() {
        quiz.inputEl.val("sdf?");
        retVal = quiz.removeQuestionMark();
      });

      it("should remove the last character", function() {
        expect(quiz.inputEl.val()).toBe("sdf")
      });

      it("should return true", function() {
        expect(retVal).toBe(true);
      });
    });

    describe("when the last character of the input is NOT a question mark", function() {
      beforeEach(function() {
        quiz.inputEl.val("sdf");
        retVal = quiz.removeQuestionMark();
      });

      it("should NOT remove the last character", function() {
        expect(quiz.inputEl.val()).toBe("sdf")
      });

      it("should return false", function() {
        expect(retVal).toBe(false);
      });
    });
  });

  describe("question mark key event handled", function() {
    beforeEach(function() {
      words = [{hint:"one",solution:"1"},{hint:"two",solution:"2"}];
      initializeQuiz(quiz);
      quiz.start(words);
      quiz.inputEl.val("something incorrect");
      quiz.showSolution();
    });

    it("should show the solution in the status", function() {
      expect(quiz.statusEl.html()).toBe("1");
    });

    it("should clear the input", function() {
      expect(quiz.inputEl.val()).toBe("");
    });
  });
});
