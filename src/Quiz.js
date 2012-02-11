function Quiz() {}

Quiz.prototype.initialize = function(inputEl, solutionEl, hintEl, statusEl) {
  var self = this;

  this.inputEl = inputEl;
  this.solutionEl = solutionEl;
  this.hintEl = hintEl;
  this.statusEl = statusEl;

  this.inputEl.keydown(function(e) {
    if (e.keyCode == 13) {
      self.checkMatch();
    }
  });
}

Quiz.prototype.start = function(words) {
  this.words = words;
  this.nextWord();
}

Quiz.prototype.checkMatch = function() {
  if (this.solutionEl.html() == this.inputEl.val()) {
    this.nextWord();
    this.statusEl.html("correct!")
  } else {
    this.statusEl.html("incorrect!")
  }
  this.statusEl.show().fadeOut();
}

Quiz.prototype.nextWord = function() {
  var word = this.words.shift();
  this.inputEl.val("");
  this.hintEl.html(word.hint);
  this.solutionEl.html(word.solution);

  this.inputEl.blur();
  this.inputEl.focus();
}
