class Game extends Base {
    constructor() {
        super();

        this.board             = $('.game-board');
        this.boardContainer    = this.board.parent();
        this.cells             = $('.game-board td');
        this.cellsMovable      = $('.game-board td.near');
        this.cellsClosed       = $('.game-board td:not(.near)');
        this.cellsClosedWindow = $('#cells-closed-window');
        this.controls          = $('#game-controls');

        this.stratHide  = $('#strat-hide');
        this.stratWar   = $('#strat-war');
        this.stratSplit = $('#strat-split');

        this.exitButton = $('#exit');

        this.hpBar       = $('#hp-bar');
        this.hpBarWindow = $('#hp-bar-window');
        this.stratInfoButton = $('#strat-info');
        this.stratInfoWindow = $('#strat-info-window');

        this.click(this.cellsMovable, this.gameTick);
        this.click(this.cellsClosed, this.makeModalShower(this.cellsClosedWindow));

        this.click(this.stratHide,  this.setCurrentStratToHide);
        this.click(this.stratWar,   this.setCurrentStratToWar);
        this.click(this.stratSplit, this.setCurrentStratToSplit);

        this.click(this.exitButton, this.exit);

        this.click(this.hpBar,           this.makeModalShower(this.hpBarWindow));
        this.click(this.stratInfoButton, this.makeModalShower(this.stratInfoWindow));

        this.renderBoard();
    }

    gameTick() {
        // TODO

        console.log('tick');
    }

    renderBoard() {
        const pageWidth = $(document).width();
        const containerWidth  = this.boardContainer.width();
        const containerHeight = this.boardContainer.height();
        const boardSize = 0.8;
        const boardSideMargin = (1 - boardSize) / 2;
        let   absoluteBoardSideMargin = containerWidth * boardSideMargin;
        const boardBottomMargin = 100;
        let   boardWidth = containerWidth * boardSize;
        const boardHeight = (containerHeight - boardBottomMargin) * boardSize;
        const cellsX = 8;
        const cellsY = 6;

        if (pageWidth < 1081) {
            boardWidth *= 1.15;
            absoluteBoardSideMargin *= 0.4;
        }

        this.board
            .css('width', boardWidth)
            .css('height', boardHeight)
            .css('margin-left', absoluteBoardSideMargin);

        this.cells
            .css('width', boardWidth / cellsX)
            .css('height', boardHeight / cellsY);

        this.controls
            .css('padding-right', absoluteBoardSideMargin)
    }

    setCurrentStratToHide() {
        this.strat = 'hide';
    }

    setCurrentStratToWar() {
        this.strat = 'war';
    }

    setCurrentStratToSplit() {
        this.strat = 'split';
    }

    exit() {
        // TODO

        console.log('exit');
    }
}

$(() => new Game());