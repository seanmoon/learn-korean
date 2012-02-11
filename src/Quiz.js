function Quiz() {}

Quiz.prototype.initialize = function(inputEl, solutionEl, hintEl, statusEl, completedCountEl, totalEl) {
  var self = this;

  this.inputEl = inputEl;
  this.solutionEl = solutionEl;
  this.hintEl = hintEl;
  this.statusEl = statusEl;
  this.completedCountEl = completedCountEl;
  this.totalEl = totalEl;

  this.inputEl.keydown(function(e) {
    if (e.keyCode == 13) { self.checkMatch(); } // enter
    else if (e.keyCode == 191) { // question mark
      e.preventDefault();
      self.showSolution();
    }
  });

  this.inputEl.keyup(function(e) {
    if (self.removeQuestionMark()) { self.showSolution(); }
  });
}

Quiz.prototype.start = function(words) {
  this.words = words;
  this.completedCountEl.html("0");
  this.totalEl.html(words.length);
  this.nextWord();
}

Quiz.prototype.checkMatch = function() {
  if (this.solutionEl.html() == this.inputEl.val()) {
    this.nextWord();
    this.statusEl.html("correct!");
    var completedCount = parseInt(this.completedCountEl.html());
    this.completedCountEl.html(completedCount + 1);
  } else {
    this.statusEl.html("incorrect!");
  }
  this.statusEl.show().fadeOut("slow");
}

Quiz.prototype.showSolution = function() {
  this.statusEl.html(this.solutionEl.html());
  this.inputEl.val("");
  this.statusEl.show().fadeOut(2200);
}

Quiz.prototype.removeQuestionMark = function() {
  var val = this.inputEl.val()
  var lastCharIndex = val.length - 1;
  if (val.charAt(lastCharIndex) == "?") {
    this.inputEl.val(val.substring(0, lastCharIndex));
    return true;
  }
  return false;
}

Quiz.prototype.nextWord = function() {
  var word = this.words.shift();
  this.inputEl.val("");
  this.hintEl.html(word.hint);
  this.solutionEl.html(word.solution);

  this.inputEl.blur();
  this.inputEl.focus();
}
