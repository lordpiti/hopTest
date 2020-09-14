using System;
using System.Threading.Tasks;
using HomeExercise.Models;
using HomeExercise.Services;
using Microsoft.AspNetCore.Mvc;

namespace HomeExercise.Controllers
{
    [Route("api/[controller]")]
    public class DivisionsController : Controller
    {
        private readonly IDivisionInfoService _divisionInfoService;

        public DivisionsController(IDivisionInfoService divisionInfoService)
        {
            _divisionInfoService = divisionInfoService;
        }

        [HttpGet("[action]")]
        public async Task<DivisionInformation> DivisionPage(int skip, int take)
        {
            var model = await _divisionInfoService.GetDivisionPage(skip, take);

            return model;
        }

        [HttpPost("[action]")]
        public void SaveNotes([FromBody] NoteInfo notes)
        {
            _divisionInfoService.SaveNotesForDivision(notes.DivisionId, notes.Notes);
        }

        [HttpGet("[action]/{divisionId}")]
        public string GetNotes(int divisionId)
        {
            return _divisionInfoService.GetNotesForDivision(divisionId);
        }
    }
}
